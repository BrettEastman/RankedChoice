<script>
  export let labelText = '';
  export let name = '';
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let required = true;
  export let onChange = () => {};
</script>

<div class='flex flex-col'>
  <label for={labelText}>{labelText}</label>
  <input
    type={type}
    name={name}
    id={name}
    placeholder={placeholder}
    value={value}
    required={required}
    on:change={onChange}
  />
</div>
