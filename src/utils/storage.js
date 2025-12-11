// Servicio de persistencia con Dexie
// Separa la lógica de guardado/carga del UI
import Dexie from 'dexie';

export const db = new Dexie('bulls-cows');

db.version(1).stores({
  players: '++id, name, color',
  game: 'key',
  attempts: '++id, player, ts',
});

// game store holds small key-value entries
// { key: 'state', value: { currentPlayer, gameStarted, gameEnded } }

export async function savePlayers(p1, p2) {
  await db.players.clear();
  await db.players.bulkAdd([
    { id: 1, name: p1.name, color: p1.color, secretEnc: p1.secretEnc },
    { id: 2, name: p2.name, color: p2.color, secretEnc: p2.secretEnc },
  ]);
}

export async function loadPlayers() {
  const [p1, p2] = await Promise.all([
    db.players.get(1),
    db.players.get(2),
  ]);
  return { p1, p2 };
}

export async function saveGameState(state) {
  await db.game.put({ key: 'state', value: state });
}

export async function loadGameState() {
  const row = await db.game.get('state');
  return row?.value || null;
}

export async function addAttempt(player, attempt) {
  await db.attempts.add({ player, ...attempt });
}

export async function getAttempts(player) {
  const rows = await db.attempts
    .where('player')
    .equals(player)
    .toArray();
  rows.sort((a, b) => b.ts - a.ts);
  return rows;
}

export async function clearAll() {
  await Promise.all([db.players.clear(), db.attempts.clear(), db.game.clear()]);
}
