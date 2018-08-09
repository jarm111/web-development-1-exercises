# Summary of Angular vs React & AngularJS

This sums my preliminary notes of comparing Angular to React and AngularJS.

## Angular vs React

Similarities:
- UI is composed of reusable components that form a hierarchy

Differences:
- Angular is full frontend framework, React more of an efficient UI library for building the view
- React uses one-way data flow, Angular both one-way and two-way binding
- Angular uses separate template HTML files, React embeds document markup in JSX inside JavaScript code
- Angular's learning curve is perhaps steeper with complex architecture and more concepts to understand
- React code typically is written in ES6 + JSX and Angular in TypeScript
- React makes data flow explicit and easy to understand but requires more typing code

## Angular (Angular2+) vs AngularJS (Angular1.x)

Similarities:
- Both of them have some similar constructs/functionality/terms like modules, templates, directives, data binding, services, dependency injection and routing

Differences:
- New Angular is component based, AngularJS closer to the classic MVC model
- In Angular you don't write Controllers or put variables in scope anymore
- AngularJS is simpler to set up and pick-up with support for older browsers, but Angular offers more robust and scalable platform for building modern client applications