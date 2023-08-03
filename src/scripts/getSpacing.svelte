<script context="module">
  // Originally authored by Alex Nitta and Brett Eastman
  import spacing from '../utils/spacing.js';

  const getSpacingFromArray = function (arr) {
      const spacingKeys = Object.keys(spacing);
      const result = arr.reduce((acc, current) => {
          current = current.toString();
          if (!spacingKeys.includes(current)) {
              throw new Error(
                  `Invalid spacing value: ${current}. Valid numbers are: ${spacingKeys.join(
                      ', '
                  )}`
              );
          } else {
              acc.push(spacing[current]);
          }
          return acc;
      }, []);
      return result.join(' ');
  };

  const getSpacingFromNumber = function (num) {
      num = num.toString();
      const spacingKeys = Object.keys(spacing);
      if (spacingKeys.includes(num)) {
          return spacing[num];
      }
      if (!spacingKeys.includes(num)) {
          throw new Error(
              `Invalid spacing value: ${num}. Valid values are: ${spacingKeys.join(
                  ', '
              )}`
          );
      }
  };

  export function getSpacing(input) {
      if (typeof input === 'number') {
          return getSpacingFromNumber(input);
      }

      if (Array.isArray(input)) {
          return getSpacingFromArray(input);
      }

      console.error('Input must be a number or an array of numbers.');
  }
</script>
