import { TrainingListResType } from "@/app/schemaValidations/trainning";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {endOfMonth, format, startOfMonth } from 'date-fns';
export default function TrainingTable({ trainings, onStartDate, onEndDate }:
    {
        trainings: TrainingListResType;
        onStartDate: (value: string) => void;
        onEndDate : (value: string) => void;
    }
) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    });

    const handleDateSelect = (newDate: DateRange | undefined) => {
        setDate(newDate);

        if (newDate?.from) {
            const formattedStartDate = format(newDate.from, "yyyyMMdd");
            onStartDate(formattedStartDate.substring(1)); // Set the start date
        }
            
        if (newDate?.to) {
            const formattedEndDate = format(newDate.to, "yyyyMMdd");
            onEndDate(formattedEndDate.substring(1)); // Set the end date
          }
    };

    return (
        <>
            <div className="flex items-center py-4 justify-between">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "yyyy-MM-dd")} -{" "}
                                        {format(date.to, "yyyy-MM-dd")}
                                    </>
                                ) : (
                                    format(date.from, "yyyy-MM-dd")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={handleDateSelect}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >公司</TableHead>
                        <TableHead>部門代號</TableHead>
                        <TableHead>部門名字</TableHead>
                        <TableHead>年</TableHead>
                        <TableHead>月</TableHead>
                        <TableHead>VNW</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trainings?.map((item) => (
                        <TableRow >
                            <TableCell className="font-medium">{item.co}</TableCell>
                            <TableCell>{item.dp}</TableCell>
                            <TableCell>{item.dpnm}</TableCell>
                            <TableCell>{item.yr}</TableCell>
                            <TableCell>{item.seq}</TableCell>
                            <TableCell>{item.prwpes}</TableCell>
                            {/* <TableCell>{item.prwpesnm}</TableCell>
                        <TableCell>{item.traid}</TableCell>
                        <TableCell>{item.tranm}</TableCell>
                        <TableCell>{item.tradst}</TableCell>

                        <TableCell>{item.mon}</TableCell>
                        <TableCell>{item.tradys}</TableCell>
                        <TableCell>{item.trahrs}</TableCell>
                        <TableCell>{item.traobj}</TableCell>
                        <TableCell>{item.trasite}</TableCell>
                        <TableCell>{item.tradpnm}</TableCell> */}
                        </TableRow>
                    ))}

                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </>

    )
}