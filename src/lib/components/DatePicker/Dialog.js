import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CloseIcon from "../../assets/svg/close.svg";
import DateInputGroup from "./DateInputGroup";
import DialogContentMobile from "./DialogContentMobile";

const Dialog = ({
  contentFooter,
  dataPrice,
  submitButton,
  toggleDialog,
  complsOpen,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  handleReset,
  handleClickDateInput,
  inputFocus,
  handleChangeDate,
  startDatePlaceholder,
  endDatePlaceholder,
  startWeekDay,
  minDate,
  maxDate,
  dateFormat,
  weekDayFormat,
  monthFormat,
  isSingle,
  isMobile,
  highlightToday,
  hideDialogHeader,
  hideDialogFooter,
  dateInputSeperator,
  singleCalendar,
  tooltip,
  disableDate,
  language,
}) => {
  const [hideAnimation, setHideAnimation] = useState(false);
  const [dateChanged, setDateChanged] = useState();
  const containerRef = useRef();

  function onChangeDate(date, value) {
    setDateChanged(date);
    handleChangeDate(date, value);
  }

  useEffect(() => {
    if (complsOpen && !hideAnimation) {
      setHideAnimation(true);
    }
    if (complsOpen) {
      setTimeout(() => {
        if (containerRef.current && containerRef.current.getElementById) {
          const startDateInput = containerRef.current.getElementById(
            "start-date-input-button"
          );
          if (startDateInput) {
            startDateInput.focus();
          }
        }
      }, 50);
    }
  }, [complsOpen]);

  return (
    <div
      className={cx("dialog-date-picker", {
        open: complsOpen,
        hide: !complsOpen && hideAnimation,
        single: singleCalendar && !isMobile,
      })}
      ref={containerRef}
    >
      {!hideDialogHeader && (
        <div className="dialog-header">
          <button
            type="button"
            className="btn-outline back-button"
            onClick={toggleDialog}
          >
            <CloseIcon />
          </button>
          <DateInputGroup
            inputFocus={inputFocus}
            handleClickDateInput={handleClickDateInput}
            fromDate={fromDate}
            toDate={toDate}
            minDate={minDate}
            maxDate={maxDate}
            handleChangeDate={onChangeDate}
            startDatePlaceholder={startDatePlaceholder}
            endDatePlaceholder={endDatePlaceholder}
            dateFormat={dateFormat}
            isSingle={isSingle}
            nonFocusable={!complsOpen}
            dateInputSeperator={dateInputSeperator}
          />
          <button
            type="button"
            className="btn-outline reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}

      <div className="dialog-content">
        <DialogContentMobile
          dataPrice={dataPrice}
          fromDate={fromDate}
          toDate={toDate}
          hoverDate={hoverDate}
          onSelectDate={onSelectDate}
          startWeekDay={startWeekDay}
          minDate={minDate}
          maxDate={maxDate}
          disableDate={disableDate}
          dateFormat={dateFormat}
          weekDayFormat={weekDayFormat}
          monthFormat={monthFormat}
          complsOpen={complsOpen}
          isSingle={isSingle}
          highlightToday={highlightToday}
          tooltip={tooltip}
          language={language}
        />
      </div>
      {!hideDialogFooter && (
        <div className="dialog-footer">
          {contentFooter}
          <div className="button-wrapper">
            <button
              type="button"
              className="btn-outline reset-button mobile"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={submitButton}
              tabIndex="0"
            >
              {language === "en" ? "Save" : "Simpan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Dialog.propTypes = {
  contentFooter: PropTypes.node,
  dataPrice: PropTypes.object,
  complsOpen: PropTypes.bool,
  inputFocus: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  submitButton: PropTypes.func,
  toggleDialog: PropTypes.func,
  handleClickDateInput: PropTypes.func,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  handleReset: PropTypes.func,
  handleChangeDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  startWeekDay: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disableDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  isMobile: PropTypes.bool,
  highlightToday: PropTypes.bool,
  weekDayFormat: PropTypes.string,
  hideDialogHeader: PropTypes.bool,
  hideDialogFooter: PropTypes.bool,
  dateInputSeperator: PropTypes.node,
  singleCalendar: PropTypes.bool,
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  language: PropTypes.string,
};

Dialog.defaultProps = {
  contentFooter: null,
  dataPrice: null,
  complsOpen: false,
  inputFocus: null,
  fromDate: null,
  toDate: null,
  hoverDate: null,
  submitButton: () => {},
  toggleDialog: () => {},
  handleClickDateInput: () => {},
  onSelectDate: () => {},
  onHoverDate: () => {},
  handleReset: () => {},
  handleChangeDate: () => {},
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  startWeekDay: null,
  minDate: null,
  maxDate: null,
  disableDate: null,
  dateFormat: "",
  monthFormat: "",
  isSingle: false,
  isMobile: true,
  highlightToday: false,
  weekDayFormat: "",
  hideDialogHeader: false,
  hideDialogFooter: false,
  dateInputSeperator: null,
  singleCalendar: false,
  tooltip: "",
  language: "",
};

export default Dialog;
