import getMonthByNumber from "../utils/getMonthByNumber";

export function DateComponent(params: { date: Date | null }) {
	const date = params.date;
	return (
		<div className="date">{date?<><span className="day">{new Date(date).getDate()}</span><span className="month">{getMonthByNumber(new Date(date).getMonth())}</span></>:''}</div>
	)
}