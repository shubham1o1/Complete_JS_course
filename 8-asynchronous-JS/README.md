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

## Understanding Asynchronous JavaScript The Event Loop:

- Synchronous: Sequential, one instruction after another.
- Asynchronous: Doesn't wait for line to execute to go to next line.

### Main Idea behind async:

- Allow asynchronous functions to run in the "background"
- We pass in callbacks that run once the function has finished its work
- Move on immediately Non-blocking!
- Example:

```js
const image = document.getElementByID("img").src;

processLargeImage(image, () => {
  console.log("Image Processed~");
});
```

- We can defer actions to the future.

### Under the Hood (Event Loop):

- Event Loop, Web Apis, Execution Stack and Message Queue together make a JS runtime.
- This runtime is responsible for how JS runs behind the scenes as it executes the code.

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

- In this code, when first() is called, it gets its execution stack.
- Then inside first() console.log() is called and it also gets its Execution Stack. Then text is logged to console, then function returns then it pops from the stack.
- Then execution context is created by second() function. Inside which setTimeout() is called. Which also gets its execution stack.
- setTimeout() function comes from the web apis which lives separate from JS engine.
- web apis: stuffs like DOM manipulation methods, setTimeout(), httprequest for ajax, geo location, local storage live outside of JS engine and we can access them because they are part of a runtime. This is exactly where the timer will keep running without being blocked.
- When we call setTimeout function, timer is created together with callback function inside the web apis environment. It sits there until it finishes its work. Call back function is not called until the timer finishes.
- Since the timer keeps working in the background, we dont have to wait and keep on executing our code.

![setTimeout context](notes-images/settimeoutcontext.png)

- The setTimeout() function returns, pops up the stack, and so does the execution context of the second function.
- It reaches the log with "The End" which it prints on console after being added to stack and pop the console's stack
- The first() function returns and we are back to original state
- Now the timer has passed then the callback function moves to message queue

![callback in queue](notes-images/callbackqueue.png)

- This is exactly what happens for DOM events as well.
- In case of DOM events our events sit in the web apis waiting for a certain event to happen.
- As soon as the event happens that callback is placed on the message queue ready to be executed.

### Executing callback functions in the message queue:

- The job of the event loop is to constantly monitor Execution Stack and the message queue and push the callback function to the execution stack as soon as the stack is empty.
- Since the stack is empty now, the callback is now pushed to the execution stack, then the log of the callback function is place and then logged to the console and then popped from the stack.
- If there were some more callbacks waiting right now like data coming back from ajax requests or the handler of a dom event then the event loop would continue pushing them to the event stack untill all of them were processed.

### Final State:

![finalstate](notes-images/finalstate.png)
