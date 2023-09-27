<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  <span>count</span> is {count}
</button>


<style>
  /* Scoped styles work too, not just global styles. */
  span {
    font-weight: bold;
  }
</style>