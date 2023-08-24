<script lang="ts" context="module">
  // Originally authored by Alex Nitta and Brett Eastman
  import spacing from "../utils/spacing.js";

  const getSpacingFromArray = function (arr: number[]) {
    const spacingKeys = Object.keys(spacing);
    const result = arr.reduce((acc, current) => {
      const currentString = current.toString();
      if (!spacingKeys.includes(currentString)) {
        throw new Error(
          `Invalid spacing value: ${currentString}. Valid numbers are: ${spacingKeys.join(
            ", "
          )}`
        );
      } else {
        acc.push(spacing[currentString]);
      }
      return acc;
    }, []);
    return result.join(" ");
  };

  const getSpacingFromNumber = function (num: number) {
    const numString = num.toString();
    const spacingKeys = Object.keys(spacing);
    if (spacingKeys.includes(numString)) {
      return spacing[numString];
    }
    if (!spacingKeys.includes(numString)) {
      throw new Error(
        `Invalid spacing value: ${numString}. Valid values are: ${spacingKeys.join(
          ", "
        )}`
      );
    }
  };

  export function getSpacing(input: number | number[]) {
    if (typeof input === "number") {
      return getSpacingFromNumber(input);
    }

    if (Array.isArray(input)) {
      return getSpacingFromArray(input);
    }

    console.error("Input must be a number or an array of numbers.");
  }
</script>
