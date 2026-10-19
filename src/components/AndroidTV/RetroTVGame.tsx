import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, RotateCcw, Trophy, ArrowLeft, ArrowRight, Zap, X } from 'lucide-react';
import { tvAudio } from '../../utils/audio';

interface RetroTVGameProps {
  onClose: () => void;
  remoteCommand?: string | null;
}

export const RetroTVGame: React.FC<RetroTVGameProps> = ({
  onClose,
  remoteCommand
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(1420);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const gameState = useRef({
    playerX: 200,
    playerY: 340,
    playerSpeed: 7,
    movingLeft: false,
    movingRight: false,
    lasers: [] as { x: number; y: number; speed: number }[],
    asteroids: [] as { x: number; y: number; size: number; speed: number; color: string }[],
    stars: [] as { x: number; y: number; speed: number; size: number }[],
    scoreVal: 0,
    lastSpawn: 0
  });

  // Handle mobile remote commands
  useEffect(() => {
    if (!remoteCommand) return;
    if (remoteCommand === 'left') {
      gameState.current.playerX = Math.max(25, gameState.current.playerX - 25);
    } else if (remoteCommand === 'right') {
      gameState.current.playerX = Math.min(375, gameState.current.playerX + 25);
    } else if (remoteCommand === 'ok' || remoteCommand === 'select') {
      fireLaser();
    }
  }, [remoteCommand]);

  const fireLaser = () => {
    tvAudio.playNav();
    gameState.current.lasers.push({
      x: gameState.current.playerX,
      y: gameState.current.playerY - 15,
      speed: 10
    });
  };

  const restartGame = () => {
    tvAudio.playSelect();
    gameState.current.scoreVal = 0;
    gameState.current.playerX = 200;
    gameState.current.asteroids = [];
    gameState.current.lasers = [];
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        gameState.current.movingLeft = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        gameState.current.movingRight = true;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        fireLaser();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        gameState.current.movingLeft = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        gameState.current.movingRight = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Initialize stars
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * 400,
        y: Math.random() * 400,
        speed: 1 + Math.random() * 3,
        size: Math.random() * 2 + 0.5
      });
    }
    gameState.current.stars = stars;
  }, []);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      if (!isPlaying || gameOver) return;

      const state = gameState.current;

      // Update player position
      if (state.movingLeft && state.playerX > 25) {
        state.playerX -= state.playerSpeed;
      }
      if (state.movingRight && state.playerX < 375) {
        state.playerX += state.playerSpeed;
      }

      // Clear canvas
      ctx.fillStyle = '#060814';
      ctx.fillRect(0, 0, 400, 400);

      // Render & update starfield
      ctx.fillStyle = '#ffffff';
      for (const star of state.stars) {
        star.y += star.speed;
        if (star.y > 400) {
          star.y = 0;
          star.x = Math.random() * 400;
        }
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      // Spawn Asteroids
      if (Date.now() - state.lastSpawn > 650) {
        state.lastSpawn = Date.now();
        const colors = ['#f43f5e', '#a855f7', '#38bdf8', '#fbbf24'];
        state.asteroids.push({
          x: Math.random() * 350 + 25,
          y: -20,
          size: Math.random() * 14 + 12,
          speed: Math.random() * 2 + 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Update & Draw Lasers
      ctx.fillStyle = '#38bdf8';
      for (let i = state.lasers.length - 1; i >= 0; i--) {
        const laser = state.lasers[i];
        laser.y -= laser.speed;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fillRect(laser.x - 2, laser.y, 4, 12);
        ctx.shadowBlur = 0;

        if (laser.y < -10) {
          state.lasers.splice(i, 1);
        }
      }

      // Update & Draw Asteroids
      for (let i = state.asteroids.length - 1; i >= 0; i--) {
        const ast = state.asteroids[i];
        ast.y += ast.speed;

        ctx.fillStyle = ast.color;
        ctx.beginPath();
        ctx.arc(ast.x, ast.y, ast.size, 0, Math.PI * 2);
        ctx.fill();

        // Check laser collision
        for (let j = state.lasers.length - 1; j >= 0; j--) {
          const l = state.lasers[j];
          const dist = Math.hypot(ast.x - l.x, ast.y - l.y);
          if (dist < ast.size + 4) {
            // Hit!
            state.asteroids.splice(i, 1);
            state.lasers.splice(j, 1);
            state.scoreVal += 50;
            setScore(state.scoreVal);
            if (state.scoreVal > highScore) setHighScore(state.scoreVal);
            break;
          }
        }

        // Check player collision
        const pDist = Math.hypot(ast.x - state.playerX, ast.y - state.playerY);
        if (pDist < ast.size + 15) {
          setGameOver(true);
          return;
        }

        if (ast.y > 420) {
          state.asteroids.splice(i, 1);
          state.scoreVal += 10;
          setScore(state.scoreVal);
        }
      }

      // Draw Player Spaceship
      ctx.save();
      ctx.translate(state.playerX, state.playerY);
      
      // Ship Thruster glow
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-6, 12);
      ctx.lineTo(6, 12);
      ctx.lineTo(0, 20 + Math.random() * 6);
      ctx.closePath();
      ctx.fill();

      // Ship Body
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(14, 12);
      ctx.lineTo(0, 6);
      ctx.lineTo(-14, 12);
      ctx.closePath();
      ctx.fill();

      // Wing Cannons
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-12, 4, 3, 8);
      ctx.fillRect(9, 4, 3, 8);

      ctx.restore();

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, highScore]);

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-2xl mx-auto my-6">
      
      {/* Game Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Android TV Space Defender
            </h3>
            <p className="text-xs text-slate-400">Playable via TV Remote or Keyboard</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Score bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 rounded-xl mb-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-cyan-400">
          <span>SCORE:</span>
          <span className="text-white text-base font-bold tabular-nums">{score}</span>
        </div>
        <div className="flex items-center gap-2 text-amber-400">
          <Trophy className="w-4 h-4" />
          <span>BEST:</span>
          <span className="text-white text-base font-bold tabular-nums">{highScore}</span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full flex justify-center bg-black rounded-2xl overflow-hidden border border-slate-800">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full max-w-[400px] h-auto aspect-square"
        />

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
            <h4 className="text-2xl font-extrabold text-red-500 font-['Outfit'] mb-2">
              GAME OVER
            </h4>
            <p className="text-sm text-slate-300 mb-4">
              Final Score: <span className="font-mono text-cyan-400 font-bold">{score}</span>
            </p>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again (Enter)</span>
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Mobile TV Controls for touch or mouse */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              gameState.current.playerX = Math.max(25, gameState.current.playerX - 30);
            }}
            className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-white font-bold"
            title="Move Left (←)"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              gameState.current.playerX = Math.min(375, gameState.current.playerX + 30);
            }}
            className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-white font-bold"
            title="Move Right (→)"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={fireLaser}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 active:scale-95 rounded-xl text-white font-bold text-xs shadow-lg"
          title="Fire Laser (Space / Remote OK)"
        >
          <Zap className="w-4 h-4" />
          <span>Fire Laser</span>
        </button>
      </div>

    </div>
  );
};
