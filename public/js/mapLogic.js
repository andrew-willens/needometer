function resetSnapshotsCache(){
	if ( stateSnapshotsCache.length === 2) {
		createSnapshots(stateSnapshotsCache);
		stateSnapshotsCache = [];
	}
}
