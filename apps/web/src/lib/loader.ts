import './loader.css';

/** Inicializa a tela de loading com chip circuit animation */
export function initLoader(): void {
  const loader = document.getElementById('site-loader') as HTMLElement | null;
  if (!loader) return;

  // A animação dos traces é 100% CSS — sem intervenção JS necessária.

  // Saída: loader sobe, site revela de baixo pra cima
  const EXIT_DELAY = 3000; // ms — tempo suficiente para 1 ciclo completo de flow (2.8s) + margem

  const exitTimer = setTimeout(() => {
    loader.classList.add('loader-exit');

    document.body.classList.remove('loading');
    document.body.classList.add('loader-done');

    setTimeout(() => {
      loader.remove();
      document.body.classList.remove('loader-done');
    }, 850);
  }, EXIT_DELAY);

  // Fallback: remove loader após 7s se algo travar
  setTimeout(() => {
    clearTimeout(exitTimer);
    const l = document.getElementById('site-loader');
    if (l) {
      l.remove();
      document.body.classList.remove('loading', 'loader-done');
    }
  }, 7000);
}
