'use client';

import { useEffect, useRef, useState } from 'react';

const paragraphs = [
  <>一直都非常感激您没有嫌弃我的学历，愿意收下我，我也很庆幸能够成为您的学生。</>,
  <>刚开始接触科研的时候，我其实是比较迷茫的，犹如一只小船刚刚驶进汪洋大海，不知道方向在哪里。庆幸的是：一路上有您的包容和指导，让我慢慢找到了方向，也坚定了做科研的决心。</>,
  <>今后的日子里，我将静心沉气，积极学习，主动思考，精益求精。争取有一些成就，不辜负您的期许，也为 AgriMind 课题组争光。</>,
  <>我也坚信，在您的带领下，在咱们课题组成员的共同努力下，AgriMind 课题组必将走向辉煌。</>,
  <>最后，再次衷心祝愿：恩师，生活顺遂，万事胜意，工作顺心，学术长青！</>,
];

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
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const element = audio.current;
    if (!element) return;
    element.volume = 0.12;
    const syncPlaying = () => setPlaying(!element.paused);
    element.addEventListener('play', syncPlaying);
    element.addEventListener('pause', syncPlaying);
    element.addEventListener('ended', syncPlaying);
    element.play().catch(() => setPlaying(false));
    return () => {
      element.pause();
      element.removeEventListener('play', syncPlaying);
      element.removeEventListener('pause', syncPlaying);
      element.removeEventListener('ended', syncPlaying);
    };
  }, []);

  const toggleMusic = async () => {
    const element = audio.current;
    if (!element) return;
    if (playing) {
      element.pause();
    } else {
      try {
        await element.play();
      } catch {
        setPlaying(false);
      }
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
      <audio ref={audio} src="/una-mattina.mp3" autoPlay loop preload="auto" aria-label="Una Mattina 背景音乐" />

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
            <p>胡老师，又是一年教师节，首先祝您教师节快乐！<span className="celebrate" aria-label="庆祝">🎉</span></p>
            <p>一直都非常感激您没有嫌弃我的学历，愿意收下我，我也很庆幸能够成为您的学生。<span className="message-emoji" aria-label="向日葵">🌻</span></p>
            <p>刚开始接触科研的时候，我其实是比较迷茫的，犹如一只小船刚刚驶进汪洋大海，不知道方向在哪里。庆幸的是：一路上有您的包容和指导，让我慢慢找到了方向，也坚定了做科研的决心。<span className="message-emoji" aria-label="星星">✨</span></p>
            <p>今后的日子里，我将静心沉气，积极学习，主动思考，精益求精。争取有一些成就，不辜负您的期许，也为 AgriMind 课题组争光。<span className="message-emoji" aria-label="书本">📚</span></p>
            <p>我也坚信，在您的带领下，在咱们课题组成员的共同努力下，AgriMind 课题组必将走向辉煌。<span className="message-emoji" aria-label="嫩芽">🌱</span></p>
            <p>最后，再次衷心祝愿：恩师，生活顺遂，万事胜意，工作顺心，学术长青！<span className="message-emoji" aria-label="闪耀的星星">🌟</span></p>
          </article>

          <footer className="letter-footer">
            <span className="footer-line" />
            <p>落红不是无情物，化作春泥更护花。</p>
            <span className="footer-line" />
          </footer>
        </div>
      </section>

    </main>
  );
}
