import BaseTracker from './BaseTracker';

const pawnTemplate = ['Pa', 'Pb', 'Pc', 'Pd', 'Pe', 'Pf', 'Pg', 'Ph'];
const pieceTemplate = ['Ra', 'Nb', 'Bc', 'Qd', 'Ke', 'Bf', 'Ng', 'Rh'];

class PieceTrackerBase extends BaseTracker {
	constructor() {
		super('move');
		this.b = {};
		this.w = {};

		// first layer
		pawnTemplate.forEach((val) => {
			this.w[val] = {};
			this.b[val] = {};
		});
		pieceTemplate.forEach((val) => {
			this.w[val] = {};
			this.b[val] = {};
		});

		// second layer
		Object.keys(this.w).forEach((key) => {
			pawnTemplate.forEach((val) => {
				this.w[key][val] = 0;
				this.b[key][val] = 0;
			});
			pieceTemplate.forEach((val) => {
				this.w[key][val] = 0;
				this.b[key][val] = 0;
			});
		});
	}

	add(tracker) {
		this.time += tracker.time;

		pawnTemplate.forEach((pawn) => {
			pieceTemplate.forEach((piece) => {
				this.w[pawn][piece] += tracker.w[pawn][piece];
				this.b[pawn][piece] += tracker.b[pawn][piece];
			});
			pawnTemplate.forEach((pawn2) => {
				this.w[pawn][pawn2] += tracker.w[pawn][pawn2];
				this.b[pawn][pawn2] += tracker.b[pawn][pawn2];
			});
		});
		pieceTemplate.forEach((piece) => {
			pieceTemplate.forEach((piece2) => {
				this.w[piece][piece2] += tracker.w[piece][piece2];
				this.b[piece][piece2] += tracker.b[piece][piece2];
			});
			pawnTemplate.forEach((pawn) => {
				this.w[piece][pawn] += tracker.w[piece][pawn];
				this.b[piece][pawn] += tracker.b[piece][pawn];
			});
		});
	}

	track(moveData) {
		const { player } = moveData;
		const { piece } = moveData;
		const { takes } = moveData;

		if (takes.piece !== undefined) {
			if (
				piece.length > 1 &&
				takes.piece.length > 1 &&
				!piece.match(/\d/g) &&
				!takes.piece.match(/\d/g)
			) {
				this.processTakes(player, piece, takes.piece);
			}
		}
	}

	processTakes(player, takingPiece, takenPiece) {
		this[player][takingPiece][takenPiece] += 1;
	}
}
export default PieceTrackerBase;
