DatePicker examples:

###### RangeDatePicker

```js
import RangeDatePicker from "./RangeDatePicker";

<div className="react-google-flight-datepicker">
  <div className="date-picker-demo">
    <RangeDatePicker
      // startDatePlaceholder="My from date"
      // onChange={(startDate, endDate) => console.log(startDate, endDate)}
      // onFocus={(inputFocus) => console.log(inputFocus)}
      startDate={new Date("2020-04-20")}
      endDate={new Date("2020-05-25")}
      // startWeekDay="sunday"
      minDate={new Date("2023-01-01")}
      maxDate={new Date("2023-12-31")}
      dateFormat="DD MMM"
      dataPrice="450 rb"
      language="id"
      // monthFormat="MMM --- YY"
      tooltip={(date) => {
        return <div>{date.toDateString()}</div>;
      }}
    />
  </div>
</div>;
```
