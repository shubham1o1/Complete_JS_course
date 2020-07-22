# Part 2

- Note about the Part 2 of the App begins here

## Project Planning and Architecture (Step-2)

### The structure of our app:

![architecture step 2](notes-images/archstep2.png)

- There are 3 modules and their methods are represented above in the diagram.
- The green arrows show the connection between functions
- Green dot represents an event

### Planning (Step 2)

- Add functionality of deleting items.
- Here is the diagram for the to-do list:

![planning of project](notes-images/plan2.png)

## Event Delegation

### Event Bubbling:

- When an event is fired or triggered on some DOM element, like clicking on button then the exact same event is also triggered in all of the parent elements.

![bubbling of event](notes-images/eventbubbling.png)

- Here event is triggred in button then it bubbles up and gets triggered for paragraph then for section then for main
- Event bubbles up inside the DOM tree.

#### Target Element:

- the element that triggered the event (button in above pic)
- Target element is stored as an property in event object
- So, parent elements will also know in which element the event was first fired.

If the event bubbles up in the DOM tree and if we know where the event was fired then we can simply attach an event handler to the parent element and wait for the event to bubble up. Then we can do whatever we want with the target element. This technique is called event delegation. We could simply add the event handler to the `<main></main>` element.

![event delegation](notes-images/eventdelegation.png)

Event Delegation is not adding event handler to the target element but to the parent element that wait for the event to be bubbled up and then be triggered. Then we can act on the element that we are interested in using the target element property.

### Use Cases for Event delegation:

- When we have an element with lots of child elements that we are interested in
- When we want an event handler attached to an element that is not yet in the DOM when our page is loaded.
