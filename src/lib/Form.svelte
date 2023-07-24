<script>
  import FormInput from "./FormInput.svelte";
  import Inline from "./Inline.svelte";

  const initialFormValues = {
    candidate1: '',
    candidate2: '',
    candidate3: '',
    voter1: '',
    voter2: '',
    voter3: '',
    voter4: '',
    voter5: '',
  };
</script>

<Inline>
  <FormInput
    labelText="Candidate 1"
    name="candidate1"
    placeholder="Candidate 1"
    value={initialFormValues.candidate1}
    required={true}
  />
  <FormInput
    labelText="Candidate 2"
    name="candidate2"
    placeholder="Candidate 2"
    value={initialFormValues.candidate2}
    required={true}
  />
  <FormInput
    labelText="Candidate 3"
    name="candidate3"
    placeholder="Candidate 3"
    value={initialFormValues.candidate3}
    required={true}
  />
  <input type="submit" value="Submit" />
</Inline>