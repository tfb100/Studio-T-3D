import './style.css';

// ==========================================
// MENU MOBILE HAMBURGUER
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu')?.querySelector('.nav-links');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        }
    });

    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}

// ==========================================
// SCROLL EFFECT & PROGRESS BAR
// ==========================================
const navbarWrapper = document.getElementById('navbarWrapper');
const progressBar = document.getElementById('progressBar');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const menuLinksGlobal = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (progressBar) progressBar.style.width = scrollPercent + '%';

    if (navbarWrapper) {
        if (scrollTop > 50) navbarWrapper.classList.add('scrolled');
        else navbarWrapper.classList.remove('scrolled');
    }

    if (backToTopBtn) {
        if (scrollTop > 300) backToTopBtn.classList.add('visible');
        else backToTopBtn.classList.remove('visible');
    }

    // SCROLLSPY
    if (sections.length > 0 && menuLinksGlobal.length > 0) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        menuLinksGlobal.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `/#${current}`) {
                link.classList.add('active');
            }
        });
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// TEMA CLARO/ESCURO
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        if (themeToggle) themeToggle.setAttribute('aria-label', 'Alternar para Tema Escuro');
    } else {
        document.documentElement.classList.remove('light-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        if (themeToggle) themeToggle.setAttribute('aria-label', 'Alternar para Tema Claro');
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    setTheme('light');
} else {
    setTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
}


// ==========================================
// GLOSSÁRIO
// ==========================================
const glossarySearch = document.getElementById('glossarySearch');
if (glossarySearch) {
    const accordions = document.querySelectorAll('.accordion');
    const accordionGroups = document.querySelectorAll('.accordion-group');
    
    // Tornar função global para ser chamada pelo HTML se tiver onclick
    // toggleAccordion movido para escopo global
    glossarySearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        accordions.forEach(acc => {
            const dataTerm = acc.getAttribute('data-term') || "";
            const termText = acc.querySelector('.accordion-header')?.innerText.toLowerCase() || "";
            const bodyText = acc.querySelector('.accordion-content')?.innerText.toLowerCase() || "";
            
            if (dataTerm.toLowerCase().includes(query) || termText.includes(query) || bodyText.includes(query)) {
                acc.style.display = 'block';
                if (query !== '') {
                    highlightText(acc.querySelector('.accordion-header-title'), query);
                } else {
                    removeHighlight(acc.querySelector('.accordion-header-title'));
                }
            } else {
                acc.style.display = 'none';
                acc.classList.remove('active');
                const b = acc.querySelector('.accordion-body');
                if (b) b.style.maxHeight = null;
            }
        });
        
        accordionGroups.forEach(group => {
            const visibleAccs = group.querySelectorAll('.accordion[style="display: block;"], .accordion:not([style*="display: none"])');
            if (visibleAccs.length === 0) {
                group.style.display = 'none';
            } else {
                group.style.display = 'block';
            }
        });
    });
}

// ==========================================
// STEPS INTERATIVOS (PROCEDIMENTOS)
// ==========================================
const stepItems = document.querySelectorAll('.step-item');
const stepPanels = document.querySelectorAll('.step-panel');
const stepsProgress = document.getElementById('stepsProgress');

if (stepItems.length > 0) {
    window.switchStep = function(stepNum) {
        stepItems.forEach(item => {
            const itemStep = parseInt(item.getAttribute('data-step'));
            if (itemStep < stepNum) {
                item.classList.add('completed');
                item.classList.remove('active');
            } else if (itemStep === stepNum) {
                item.classList.add('active');
                item.classList.remove('completed');
            } else {
                item.classList.remove('active', 'completed');
            }
        });
        const percent = ((stepNum - 1) / (stepItems.length - 1)) * 100;
        if (stepsProgress) stepsProgress.style.width = percent + '%';
        
        stepPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        const p = document.getElementById(`stepPanel${stepNum}`);
        if(p) p.classList.add('active');
    }
}

// ==========================================
// CHECKLIST PERSISTENTE
// ==========================================
const checkboxes = document.querySelectorAll('.checklist-checkbox');
if (checkboxes.length > 0) {
    checkboxes.forEach(chk => {
        const checked = localStorage.getItem(chk.id) === 'true';
        chk.checked = checked;
        chk.addEventListener('change', () => {
            localStorage.setItem(chk.id, chk.checked);
        });
    });
}

// ==========================================
// PRIMEIRA CAMADA SVG
// ==========================================
const layerButtons = document.querySelectorAll('.layer-btn');
if (layerButtons.length > 0) {
    const nozzleG = document.getElementById('nozzle');
    const filamentPath = document.getElementById('filamentLayer');
    const layerTitle = document.getElementById('layerTitle');
    const layerDesc = document.getElementById('layerDesc');
    
    const statesData = {
        low: {
            title: '<i class="fa-solid fa-circle-xmark" style="color: var(--danger);"></i> Bico Muito Baixo (Z-Offset Baixo)',
            desc: 'O bico está tão próximo da mesa que esmaga demais o filamento...',
            color: 'var(--danger)',
            nozzleTransform: 'translate(0, 13px)',
            pathD: 'M 50 160 Q 150 157 250 160'
        },
        ideal: {
            title: '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i> Altura Ideal (Z-Offset Perfeito)',
            desc: 'O bico está na distância ideal. O filamento sai ligeiramente achatado...',
            color: 'var(--success)',
            nozzleTransform: 'translate(0, 0)',
            pathD: 'M 50 160 Q 150 148 250 160'
        },
        high: {
            title: '<i class="fa-solid fa-circle-exclamation" style="color: var(--warning);"></i> Bico Muito Alto (Z-Offset Alto)',
            desc: 'O bico está muito distante da mesa. O filamento sai cilíndrico e sem sofrer achatamento...',
            color: 'var(--warning)',
            nozzleTransform: 'translate(0, -12px)',
            pathD: 'M 50 160 Q 150 135 250 160'
        }
    };
    
    window.setLayerState = function(state) {
        layerButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-state') === state) {
                btn.classList.add('active');
            }
        });
        const data = statesData[state];
        if (nozzleG && filamentPath && layerTitle && layerDesc) {
            nozzleG.setAttribute('transform', data.nozzleTransform);
            filamentPath.setAttribute('d', data.pathD);
            filamentPath.setAttribute('stroke', data.color);
            layerTitle.innerHTML = data.title;
            layerDesc.innerText = data.desc;
        }
    }
}

// ==========================================
// PRINTER TABS
// ==========================================
window.switchPrinter = function(printerId) {
    document.querySelectorAll('.printer-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.printer-content').forEach(content => content.classList.remove('active'));
    const clickedTab = Array.from(document.querySelectorAll('.printer-tab')).find(tab => tab.getAttribute('onclick').includes(printerId));
    if (clickedTab) clickedTab.classList.add('active');
    
    if (printerId === 'bambu') {
        const p = document.getElementById('printerBambu'); if(p) p.classList.add('active');
    } else if (printerId === 'anycubic') {
        const p = document.getElementById('printerAnycubic'); if(p) p.classList.add('active');
    } else if (printerId === 'anycubicKobraX') {
        const p = document.getElementById('printerAnycubicKobraX'); if(p) p.classList.add('active');
    }
}

// ==========================================
// STL FILTERS
// ==========================================
const filterBtns = document.querySelectorAll('.stl-filter-btn');
const stlGrid = document.getElementById('stlGrid');
if (filterBtns.length > 0 && stlGrid) {
    const siteCards = stlGrid.querySelectorAll('.site-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            siteCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
}

// ==========================================
// MODAL DE ZOOM
// ==========================================
const imageModal = document.getElementById('imageModal');
if (imageModal) {
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const zoomableTrigger = document.getElementById('zoomableTrigger');
    
    if (zoomableTrigger) {
        zoomableTrigger.addEventListener('click', () => {
            const img = zoomableTrigger.querySelector('img');
            if (img && modalImage) {
                modalImage.src = img.getAttribute('src');
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                imageModal.setAttribute('aria-hidden', 'false');
            }
        });
    }
    window.closeModal = function() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        imageModal.setAttribute('aria-hidden', 'true');
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) closeModal();
    });
}

// ==========================================
// PODCAST PLAYER
// ==========================================
const audio = document.getElementById('podcastAudio');
if (audio) {
    const playPauseBtn = document.getElementById('btnPlayPause');
    const backwardBtn = document.getElementById('btnBackward');
    const forwardBtn = document.getElementById('btnForward');
    const muteBtn = document.getElementById('btnMute');
    const podcastProgressBar = document.getElementById('playerProgressBar');
    const progressFill = document.getElementById('playerProgressFill');
    const progressHandle = document.getElementById('playerProgressHandle');
    const volumeBar = document.getElementById('volumeBar');
    const volumeFill = document.getElementById('volumeFill');
    const timeElapsed = document.getElementById('timeElapsed');
    const timeTotal = document.getElementById('timeTotal');
    const playerCard = document.querySelector('.podcast-player-card');
    
    window.formatTime = function(seconds) {
        if (isNaN(seconds)) return '00:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    
    audio.addEventListener('loadedmetadata', () => {
        if (timeTotal) timeTotal.innerText = formatTime(audio.duration);
    });
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                if(playerCard) playerCard.classList.add('playing');
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                if(playerCard) playerCard.classList.remove('playing');
            }
        });
    }
    
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressHandle) progressHandle.style.left = percent + '%';
        if (timeElapsed) timeElapsed.innerText = formatTime(audio.currentTime);
    });
    
    if (podcastProgressBar) {
        podcastProgressBar.addEventListener('click', (e) => {
            const width = podcastProgressBar.clientWidth;
            const clickX = e.offsetX;
            audio.currentTime = (clickX / width) * audio.duration;
        });
    }
    if (backwardBtn) backwardBtn.addEventListener('click', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
    if (forwardBtn) forwardBtn.addEventListener('click', () => { audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); });
    
    let lastVolume = 0.8;
    audio.volume = lastVolume;
    if (volumeBar) {
        volumeBar.addEventListener('click', (e) => {
            const width = volumeBar.clientWidth;
            let val = e.offsetX / width;
            val = Math.max(0, Math.min(1, val));
            audio.volume = val;
            if (volumeFill) volumeFill.style.width = (val * 100) + '%';
            lastVolume = val;
            if (muteBtn) {
                if (val === 0) muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                else if (val < 0.5) muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
                else muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            }
        });
    }
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (audio.volume > 0) {
                lastVolume = audio.volume;
                audio.volume = 0;
                if(volumeFill) volumeFill.style.width = '0%';
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            } else {
                audio.volume = lastVolume;
                if(volumeFill) volumeFill.style.width = (lastVolume * 100) + '%';
                if (lastVolume < 0.5) muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
                else muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            }
        });
    }
    audio.addEventListener('ended', () => {
        if(playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        if(playerCard) playerCard.classList.remove('playing');
        audio.currentTime = 0;
    });
}


// ==========================================
// CALCULADORA
// ==========================================
const formCalculadora = document.getElementById('form-calculadora') || document.getElementById('calculadora') || document.getElementById('calc-peso-peca');
if (formCalculadora) {
    // 1. Definir funções de formatação e cálculo PRIMEIRO
    window.parseMoney = function(str) {
        if (!str) return 0;
        let val = str.toString().replace(/[^\d,.-]/g, '');
        val = val.replace(/\./g, '');
        val = val.replace(',', '.');
        return parseFloat(val) || 0;
    };

    window.formatMoney = function(value) {
        if (isNaN(value)) value = 0;
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    window.parseNumber = function(str) {
        if (!str) return 0;
        let val = str.toString().replace(',', '.');
        return parseFloat(val) || 0;
    };

    const calcularCustos = function() {
        const precoCarretel = parseMoney(document.getElementById('calc-preco-carretel')?.value);
        const pesoCarretel = parseNumber(document.getElementById('calc-peso-carretel')?.value);
        const pesoPeca = parseNumber(document.getElementById('calc-peso-peca')?.value);

        let custoFilamento = 0;
        if (pesoCarretel > 0) custoFilamento = (precoCarretel / pesoCarretel) * pesoPeca;

        const consumoW = parseNumber(document.getElementById('calc-consumo-w')?.value);
        const tempoH = parseNumber(document.getElementById('calc-tempo-h')?.value);
        const tarifa = parseMoney(document.getElementById('calc-tarifa')?.value);

        const consumoKwh = (consumoW * tempoH) / 1000;
        const custoEnergia = consumoKwh * tarifa;

        const desgasteHora = parseMoney(document.getElementById('calc-desgaste')?.value);
        const custoDesgaste = desgasteHora * tempoH;

        const extras = parseMoney(document.getElementById('calc-extras')?.value);
        const horaHomem = parseMoney(document.getElementById('calc-hora-homem')?.value);
        const tempoTrabalho = parseNumber(document.getElementById('calc-tempo-trabalho')?.value);
        const custoMaoObra = horaHomem * tempoTrabalho;
        const custoExtras = extras + custoMaoObra;

        const margem = parseNumber(document.getElementById('calc-margem')?.value);

        const custoTotal = custoFilamento + custoEnergia + custoDesgaste + custoExtras;
        const lucro = custoTotal * (margem / 100);
        const precoVenda = custoTotal + lucro;

        const rf = document.getElementById('res-filamento'); if(rf) rf.innerText = "R$ " + formatMoney(custoFilamento);
        const re = document.getElementById('res-energia'); if(re) re.innerText = "R$ " + formatMoney(custoEnergia);
        const rd = document.getElementById('res-desgaste'); if(rd) rd.innerText = "R$ " + formatMoney(custoDesgaste);
        const rex = document.getElementById('res-extras'); if(rex) rex.innerText = "R$ " + formatMoney(custoExtras);
        const rct = document.getElementById('res-custo-total'); if(rct) rct.innerText = "R$ " + formatMoney(custoTotal);
        const rv = document.getElementById('res-venda'); if(rv) rv.innerText = "R$ " + formatMoney(precoVenda);
        const rl = document.getElementById('res-lucro'); if(rl) rl.innerText = "R$ " + formatMoney(lucro);
    };
    window.calcularCustos = calcularCustos;

    // 2. Anexar Event Listeners aos campos de entrada
    const moneyInputs = document.querySelectorAll('.mask-money');
    const numberInputs = document.querySelectorAll('.mask-number');

    moneyInputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            const val = parseMoney(e.target.value);
            if (val === 0 && e.target.value === '') return;
            e.target.value = val.toString().replace('.', ',');
        });
        input.addEventListener('blur', (e) => {
            const val = parseMoney(e.target.value);
            e.target.value = formatMoney(val);
            calcularCustos();
        });
        input.addEventListener('input', calcularCustos);
    });

    numberInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d.,]/g, '');
            calcularCustos();
        });
    });

    // 3. Anexar Event Listeners aos Presets
    const presetFilamento = document.getElementById('preset-filamento');
    const presetImpressora = document.getElementById('preset-impressora');
    const presetComplexidade = document.getElementById('preset-complexidade');

    if(presetFilamento) presetFilamento.addEventListener('change', (e) => {
        const option = e.target.selectedOptions[0];
        if(option && option.value !== "") {
            const elPreco = document.getElementById('calc-preco-carretel');
            const elPeso = document.getElementById('calc-peso-carretel');
            if(elPreco) elPreco.value = formatMoney(parseFloat(option.getAttribute('data-preco')));
            if(elPeso) elPeso.value = option.getAttribute('data-peso');
            calcularCustos();
        }
    });

    if(presetImpressora) presetImpressora.addEventListener('change', (e) => {
        const option = e.target.selectedOptions[0];
        if(option && option.value !== "") {
            const elConsumo = document.getElementById('calc-consumo-w');
            const elDesgaste = document.getElementById('calc-desgaste');
            if(elConsumo) elConsumo.value = option.getAttribute('data-consumo');
            if(elDesgaste) elDesgaste.value = formatMoney(parseFloat(option.getAttribute('data-desgaste')));
            calcularCustos();
        }
    });

    if(presetComplexidade) presetComplexidade.addEventListener('change', (e) => {
        const option = e.target.selectedOptions[0];
        if(option && option.value !== "") {
            const elExtras = document.getElementById('calc-extras');
            const elMargem = document.getElementById('calc-margem');
            const elTempo = document.getElementById('calc-tempo-trabalho');
            if(elExtras) elExtras.value = formatMoney(parseFloat(option.getAttribute('data-extras')));
            if(elMargem) elMargem.value = option.getAttribute('data-margem');
            if(elTempo) elTempo.value = option.getAttribute('data-tempo');
            calcularCustos();
        }
    });

    // 4. Executar cálculo inicial ao carregar
    calcularCustos();
}

