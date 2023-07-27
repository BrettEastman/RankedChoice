<script>
  import FormInput from "./FormInput.svelte";
  import Inline from "./Inline.svelte";
  import { candidateData } from "../utils/stores";

  // need to explore how the dollar sign will work with storing a nested property in the candidateData object.
  const clearForm = () => {
    candidateData = [];
  };

  // same here
  const handleFormInputChange = (event) => {
    candidateData = {
      ...formInput,
      [event.target.name]: event.target.value
    };
  };

  // Function to handle form submission
  function handleSubmit() {
    // You can process the rankings here and determine the winner using the ranked-choice voting algorithm
    console.log('candidateData: ', candidateData);
  }

  function handleSubmit2() {
    // You can process the rankings here and determine the winner using the ranked-choice voting algorithm
    (e) => { candidateData.set(e.currentTarget.value); }
  }

  // const initialFormValues = {
  //   candidate1: '',
  //   candidate2: '',
  //   candidate3: '',
  //   voter1: '',
  //   voter2: '',
  //   voter3: '',
  //   voter4: '',
  //   voter5: '',
  // };
</script>

<Inline>
  <form on:submit|preventDefault={handleSubmit}>
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
  </form>
  <input type="submit" value="Submit" />
</Inline>