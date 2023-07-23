<script context="module">
  // Modification of a function originally authored by Alex Nitta and Brett Eastman for Woodshed
  import spacing from './spacing.js';

  export function getSpacing(num) {
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
</script>
