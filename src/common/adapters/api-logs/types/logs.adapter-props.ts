export interface LogsAdapterProps {
	success(scope: string, message: string): void;
	error(scope: string, message: string): void;
	info(scope: string, message: string): void;
}
