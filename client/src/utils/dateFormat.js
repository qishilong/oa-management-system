import day from "dayjs";
import "dayjs/locale/zh-cn";
import rTime from "dayjs/plugin/relativeTime";
day.locale("zh-cn");
day.extend(rTime)

export const dateFormat = (val, type = "YYYY年MM月DD日") => {
    val = new Date(val).getTime();
    return day(val).format(type);
}