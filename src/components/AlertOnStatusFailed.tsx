import { useEffect } from "react";


	export function AlertOnStatusFailed({ status, message }: { status: string; message: string }): JSX.Element | null  {
		useEffect(() => {
			if (status === 'failed') {
				alert(message);
			}
		}, [status, message]);

		return null;
	};