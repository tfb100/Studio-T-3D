import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

const pageData = {
  '/index.html': {
    title: 'Início',
    nextLink: '/glossario.html',
    nextTitle: 'Glossário',
    step: 1
  },
  '/glossario.html': {
    title: 'Glossário',
    prevLink: '/index.html',
    prevTitle: 'Início',
    nextLink: '/materiais.html',
    nextTitle: 'Materiais',
    step: 2
  },
  '/materiais.html': {
    title: 'Materiais',
    prevLink: '/glossario.html',
    prevTitle: 'Glossário',
    nextLink: '/impressoras.html',
    nextTitle: 'Equipamentos',
    step: 3
  },
  '/impressoras.html': {
    title: 'Equipamentos',
    prevLink: '/materiais.html',
    prevTitle: 'Materiais',
    nextLink: '/softwares.html',
    nextTitle: 'Softwares',
    step: 4
  },
  '/softwares.html': {
    title: 'Softwares',
    prevLink: '/impressoras.html',
    prevTitle: 'Equipamentos',
    nextLink: '/procedimentos.html',
    nextTitle: 'Procedimentos',
    step: 5
  },
  '/procedimentos.html': {
    title: 'Procedimentos',
    prevLink: '/softwares.html',
    prevTitle: 'Softwares',
    nextLink: '/calculadora.html',
    nextTitle: 'Calculadora',
    step: 6
  },
  '/calculadora.html': {
    title: 'Calculadora',
    prevLink: '/procedimentos.html',
    prevTitle: 'Procedimentos',
    nextLink: '/empreendedorismo.html',
    nextTitle: 'Empreendedorismo',
    step: 7
  },
  '/empreendedorismo.html': {
    title: 'Empreendedorismo',
    prevLink: '/calculadora.html',
    prevTitle: 'Calculadora',
    nextLink: '/',
    nextTitle: 'Início',
    step: 8
  }
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      helpers: { eq: (a, b) => a === b },
      context(pagePath) {
        return pageData[pagePath] || {};
      }
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        glossario: resolve(__dirname, 'glossario.html'),
        procedimentos: resolve(__dirname, 'procedimentos.html'),
        impressoras: resolve(__dirname, 'impressoras.html'),
        materiais: resolve(__dirname, 'materiais.html'),
        softwares: resolve(__dirname, 'softwares.html'),
        calculadora: resolve(__dirname, 'calculadora.html'),
        empreendedorismo: resolve(__dirname, 'empreendedorismo.html'),
      }
    }
  }
});
