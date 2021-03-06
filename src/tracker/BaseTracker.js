import { performance } from 'perf_hooks';

class BaseTracker {
	constructor(type) {
		this.type = type;
		this.cfg = {
			profilingActive: false
		};
		this.time = 0;
		this.t0 = 0;

		if (this.track === undefined) {
			throw new Error('Your analyzer must implement a track() method!');
		}
		if (this.type === undefined) {
			throw new Error('Your analyzer must specify a type!');
		}
	}

	analyze(data) {
		if (this.cfg.profilingActive) this.t0 = performance.now();
		this.track(data);
		if (this.cfg.profilingActive) this.time += performance.now() - this.t0;
	}
}

export default BaseTracker;
