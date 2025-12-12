export const translations = {
  es: {
    // Header & Footer
    title: 'Toros y Vacas',
    help: 'Ayuda',
    github: 'GitHub',
    copyright: '© 2024 Toros y Vacas. Todos los derechos reservados.',

    // Form
    player: 'Jugador',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre (opcional)',
    secretNumber: 'Número secreto (4 cifras)',
    secretPlaceholder: '0000',
    color: 'Color',
    colorRed: 'Rojo',
    colorBlue: 'Azul',
    colorGreen: 'Verde',
    colorYellow: 'Amarillo',
    next: 'Siguiente',
    startGame: 'Iniciar juego',
    back: 'Atrás',
    errors: {
      noLeadingZero: 'El número secreto no puede comenzar con 0.',
      invalidFormat: 'Ingresa un número de 4 cifras (solo dígitos).',
      duplicateDigits: 'El número secreto no debe tener cifras repetidas.'
    },

    // GamePlay
    guessLabel: 'Adivina el número (4 cifras)',
    guess: 'Adivinar',
    surrender: 'Rendirse',
    nextTurn: 'Siguiente Turno',
    bulls: 'Toros',
    cows: 'Vacas',
    
    // Attempts
    attempts: 'Intentos',

    // Results
    results: 'Resultados del Juego',
    secretOf: 'Número secreto de',
    attemptsOf: 'Ver intentos de',
    noAttempts: 'Sin intentos registrados',
    newGame: 'Nuevo Juego',
    won: 'ha ganado',

    // Modals
    confirmInstall: '¿Instalar Toros y Vacas en tu dispositivo?',
    installNow: 'Instalar',
    installLater: 'Ahora no',
    surrenderQuestion: '¿Deseas rendirte?',
    surrenderMessage: 'El juego se reiniciará y perderás tu progreso.',
    surrenderConfirm: 'Rendirse',
    newGameQuestion: '¿Comenzar un nuevo juego?',
    newGameMessage: 'Se perderán todos los datos del juego actual.',
    newGameConfirm: 'Nuevo Juego',
    cancel: 'Cancelar',
    areSure: '¿Estás seguro?',

    // Help
    helpTitle: 'Cómo jugar',
    helpRules: 'Reglas del juego',
    helpDescription: 'Toros y Vacas es un juego de adivinanza numérica. Cada jugador elige un número secreto de 4 dígitos únicos. Por turnos, intentan adivinar el número del contrincante. Recibirás:',
    helpBulls: 'Toros: dígitos correctos en la posición correcta',
    helpCows: 'Vacas: dígitos correctos pero en posición incorrecta',
    helpWin: 'Gana quien adivine todos los 4 dígitos (4 toros) primero.',
    helpStar: 'Si te gusta, ¡dale una estrella en GitHub!',
    giveStar: 'Dar estrella',
    close: 'Cerrar',

    // Language
    language: 'Idioma'
  },
  zh: {
    // Header & Footer
    title: '公牛与母牛',
    help: '帮助',
    github: 'GitHub',
    copyright: '© 2025 Yerbis Universes, Inc.',

    // Form
    player: '玩家',
    name: '名字',
    namePlaceholder: '你的名字（可选）',
    secretNumber: '秘密数字（4位数字）',
    secretPlaceholder: '0000',
    color: '颜色',
    colorRed: '红色',
    colorBlue: '蓝色',
    colorGreen: '绿色',
    colorYellow: '黄色',
    next: '下一步',
    startGame: '开始游戏',
    back: '返回',
    errors: {
      noLeadingZero: '秘密数字不能以 0 开头。',
      invalidFormat: '输入一个 4 位数字（仅数字）。',
      duplicateDigits: '秘密数字不能有重复的数字。'
    },

    // GamePlay
    guessLabel: '猜测数字（4位数字）',
    guess: '猜测',
    surrender: '投降',
    nextTurn: '下一回合',
    bulls: '公牛',
    cows: '母牛',
    
    // Attempts
    attempts: '尝试',

    // Results
    results: '游戏结果',
    secretOf: '的秘密数字',
    attemptsOf: '查看的尝试',
    noAttempts: '没有记录的尝试',
    newGame: '新游戏',
    won: '赢了',

    // Modals
    confirmInstall: '在你的设备上安装公牛与母牛吗？',
    installNow: '安装',
    installLater: '现在不',
    surrenderQuestion: '你想投降吗？',
    surrenderMessage: '游戏将重新开始，你将失去你的进度。',
    surrenderConfirm: '投降',
    newGameQuestion: '开始新游戏吗？',
    newGameMessage: '将失去当前游戏的所有数据。',
    newGameConfirm: '新游戏',
    cancel: '取消',
    areSure: '你确定吗？',

    // Help
    helpTitle: '如何玩',
    helpRules: '游戏规则',
    helpDescription: '公牛与母牛是一个数字猜谜游戏。每个玩家选择一个由 4 个唯一数字组成的秘密数字。轮流尝试猜测对手的数字。你会得到：',
    helpBulls: '公牛：正确的数字在正确的位置',
    helpCows: '母牛：正确的数字但位置不正确',
    helpWin: '首先猜出所有 4 个数字（4 个公牛）的人赢了。',
    helpStar: '如果你喜欢，在 GitHub 上给一个星吧！',
    giveStar: '给星',
    close: '关闭',

    // Language
    language: '语言'
  }
};

export const languages = [
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' }
];

export const getLanguage = () => {
  const stored = localStorage.getItem('language');
  if (stored) return stored;
  
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'zh') return 'zh';
  return 'es';
};

export const setLanguage = (lang) => {
  localStorage.setItem('language', lang);
};

export const t = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Fallback al key si no existe
    }
  }
  
  return value;
};
