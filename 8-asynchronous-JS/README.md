# Asynchronous JavaScript: Promises, Async/Await and Ajax:

- Async codes Keeps running on the background while our main code is still executing
- Use Cases: Requesting Some Data from a remote server, like an API.

## An Example of Asynchronous JavaScript:

- We have used the `setTimeout()` function here.
- This function has a callback function and the time of delay in millisecond as an argument

```html
<script>
  const second = () => {
    setTimeout(() => {
      console.log("Async Hey there");
    }, 2000);
  };

  const first = () => {
    console.log("Hey There!");
    second();
    console.log("The End");
  };

  first();
</script>
```

- The setTimeout() is an async function, it doesn't run sequentially.
- Here is the output of above code:

```js
Hey There!
The End
Async Hey there
```

- Although we would expect "Async Hey There" to appear before the "The End", it doesn't work that way in async programming.
