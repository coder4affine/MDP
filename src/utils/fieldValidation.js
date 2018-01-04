import moment from 'moment';

const required = value => (value ? undefined : 'Required');

const password = value =>
  (value && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#~^)(_+.,?!@$%^&*-]).{8,12}$/i.test(value)
    ? 'Invalid Password'
    : undefined);

const date = value => (value && !moment(value, 'L', true).isValid() ? 'Invalid date' : undefined);

const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength20 = maxLength(20);
const maxLength40 = maxLength(40);
const maxLength12 = maxLength(12);
const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(8);

const alphabets = value => (value && !/^[a-zA-Z]*$/i.test(value) ? 'Invalid Password' : undefined);

const normalizeDate = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return `${onlyNums}/`;
    }
    if (onlyNums.length === 4) {
      return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}/`;
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 4) {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
  }
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
};

const comparePassword = (value, allValues) =>
  (allValues.Password && value === allValues.Password ? undefined : 'Password not match');

const compareUsername = (value, allValues) =>
  (allValues.UserName && value === allValues.UserName ? undefined : 'Password not match');

const requiredIfNoSSN = (value, allValues) => (value || allValues.SSN ? undefined : 'Required');

const requiredIfNoMemberId = (value, allValues) =>
  (value || allValues.MemberId ? undefined : 'Required');

export default {
  required,
  password,
  maxLength20,
  maxLength12,
  maxLength40,
  minLength8,
  date,
  alphabets,
  normalizeDate,
  comparePassword,
  compareUsername,
  requiredIfNoSSN,
  requiredIfNoMemberId,
};
