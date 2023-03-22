const discordEpoch = 1_420_070_400_000;

export function randomSnowflake(): string {
	const timestamp = Date.now() - discordEpoch;
	const workerId = Math.floor(Math.random() * 32);
	const processId = Math.floor(Math.random() * 32);
	const increment = Math.floor(Math.random() * 4096);

	const timestampPart = BigInt(timestamp) << 22n;
	const workerIdPart = BigInt(workerId) << 17n;
	const processIdPart = BigInt(processId) << 12n;
	const incrementPart = BigInt(increment);

	const snowflakeBigInt = timestampPart | workerIdPart | processIdPart | incrementPart;

	return snowflakeBigInt.toString();
}
