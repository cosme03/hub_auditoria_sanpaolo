// js/tailwind-config.js
// Configuracao UNICA do Tailwind Play CDN, usada pelas duas paginas.
// Antes existiam dois blocos inline divergentes: o da raiz tinha apenas 4
// cores e nao declarava darkMode, o que quebrava as 14 ocorrencias de
// `border-border` e as 20 variantes `dark:` daquela pagina.
//
// Precisa ser carregado DEPOIS de https://cdn.tailwindcss.com e ANTES de
// qualquer marcacao que use as classes.
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brandOrange: '#da5513',
                brandRed: '#da0d17',
                brandBlue: '#265d7c',
                brandGreen: '#4f7039',
                mainText: '#56331b',
                mutedText: '#786d68',
                surface: '#ffffff',
                border: '#d1c8b4',
                background: '#e8e1d0',
                spPistache: '#8db56b',
                spLaranja: '#da5513',
                spRed: '#da0d17',
                secondary: '#265d7c',
                spAoleite: '#4a2f1d'
            }
        }
    }
}
