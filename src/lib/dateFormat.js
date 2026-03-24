import dayjs from 'dayjs';

function dateFormat(isoString) {
  return dayjs(isoString).format('DD/MM/YYYY, HH:mm A');
}

export default dateFormat;