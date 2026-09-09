'use client';

import { useRef, useState } from 'react';

function MusicIcon({ playing }: { playing: boolean }) {
  return (
    <span className={playing ? 'music-icon music-icon-playing' : 'music-icon'} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const timer = useRef<number | null>(null);

  const stopMusic = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    audioContext.current?.close();
    audioContext.current = null;
    setPlaying(false);
  };

  const playMusic = () => {
    const AudioContextClass = window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    audioContext.current = context;
    setPlaying(true);

    const melody = [261.63, 329.63, 392, 523.25, 392, 329.63, 293.66, 392];
    let index = 0;
    const playNote = () => {
      if (context.state === 'closed') return;
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = melody[index % melody.length];
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 2.25);
      index += 1;
      timer.current = window.setTimeout(playNote, 1600);
    };
    playNote();
  };

  const toggleMusic = () => {
    if (playing) {
      stopMusic();
    } else {
      playMusic();
    }
  };

  return (
    <main className="blessing-page">
      <div className="ambient-glow ambient-glow-one" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <img className="sunflower-art sunflower-art-left" src="/sunflowers.png" alt="" aria-hidden="true" />
      <img className="sunflower-art sunflower-art-right" src="/sunflowers.png" alt="" aria-hidden="true" />

      <button className="music-control" type="button" onClick={toggleMusic} aria-label={playing ? '关闭背景音乐' : '开启背景音乐'}>
        <MusicIcon playing={playing} />
        <span>{playing ? '音乐播放中' : '开启音乐'}</span>
      </button>

      <div className="page-stamp" aria-hidden="true">
        <span>TEACHER'S DAY</span>
        <strong>09<br />10</strong>
      </div>

      <section className="letter" aria-labelledby="page-title">
        <div className="letter-inner">
          <div className="letter-corner corner-top" aria-hidden="true">✦</div>
          <div className="letter-corner corner-bottom" aria-hidden="true">✦</div>

          <div className="letter-topline" aria-hidden="true">
            <span />
            <span className="seal">师</span>
            <span />
          </div>

          <p className="eyebrow">A note of gratitude · 2026.09.10</p>
          <h1 id="page-title">教师节快乐</h1>
          <p className="greeting">致 胡老师</p>

          <div className="context-row" aria-label="祝福来源">
            <span>一封感谢信</span>
            <span className="context-dot">·</span>
            <span>AgriMind 课题组</span>
          </div>

          <div className="divider" aria-hidden="true"><span>✦</span></div>

          <article className="message">
            <p>胡老师，又是一年教师节，首先祝您教师节快乐！</p>
            <p>一直都非常感激您没有嫌弃我的学历，愿意收下我，我也很庆幸能够成为您的学生。<span className="poem-note">“新竹高于旧竹枝，全凭老干为扶持。”<em>——郑燮《新竹》</em></span></p>
            <p>刚开始接触科研的时候，我其实是比较迷茫的，犹如一只小船刚刚驶进汪洋大海，不知道方向在哪里。庆幸的是：一路上有您的包容和指导，让我慢慢找到了方向，也坚定了做科研的决心。<span className="poem-note">“随风潜入夜，润物细无声。”<em>——杜甫《春夜喜雨》</em></span></p>
            <p>今后的日子里，我将静心沉气，积极学习，主动思考，精益求精。争取有一些成就，不辜负您的期许，也为 AgriMind 课题组争光。<span className="poem-note">“问渠那得清如许？为有源头活水来。”<em>——朱熹《观书有感》</em></span></p>
            <p>我也坚信，在您的带领下，在咱们课题组成员的共同努力下，AgriMind 课题组必将走向辉煌。<span className="poem-note">“令公桃李满天下，何用堂前更种花。”<em>——白居易《奉和令公绿野堂种花》</em></span></p>
            <p>最后，再次衷心祝愿：恩师，生活顺遂，万事胜意，工作顺心，学术长青！<span className="poem-note">“采得百花成蜜后，为谁辛苦为谁甜？”<em>——罗隐《蜂》</em></span></p>
          </article>

          <footer className="letter-footer">
            <span className="footer-line" />
            <p>献给每一位点亮过他人远方的老师</p>
            <span className="footer-line" />
          </footer>
        </div>
      </section>

      <p className="hint">轻触右上角，听一段温柔的祝福</p>
    </main>
  );
}
