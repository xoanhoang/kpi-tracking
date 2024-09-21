import { TrainingListResType } from "@/app/schemaValidations/trainning";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DepartmentListResType } from "@/app/schemaValidations/department";
import { departmentApiRequest } from "@/app/apiRequest/department";
export default function TrainingTable({ trainings, onStartDate, onEndDate, onDepartment }:
    {
        trainings: TrainingListResType;
        onStartDate: (value: string) => void;
        onEndDate: (value: string) => void;
        onDepartment: (value: string) => void;
    }
) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    });
    const [departmentList, setDepartmentList] = useState<DepartmentListResType | null>()


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
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { payload } = await departmentApiRequest.getList();
                if (payload)
                    setDepartmentList(payload);
            } catch (error) {
                console.error('edit page: ', error);
                setDepartmentList(null);
            }
            finally {

            }
        };
        fetchItem();
    }, []);
    const handleChangeDepartment = (department: string) => {
        onDepartment(department);
    };

    return (
        <>
            <div className="flex items-center py-4 justify-between">
                <div className="flex gap-5">
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
                    <Select onValueChange={(value: string) => { handleChangeDepartment(value) }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="--Department--" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={0} value={' '}>--所有--</SelectItem>
                            {departmentList?.map((item, index) => (
                                <SelectItem key={index} value={item.dpnm}
                                >
                                   {item.dpnm}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

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