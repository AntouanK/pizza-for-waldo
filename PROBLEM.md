## Problem Statement :pizza:
We have a TON of :pizza: and a GraphQL API but no way for pizza lovers to actually order their 'za! Your goal is to design a pizza order form using React & Redux.  Pizza lovers need to be able to add pizzas to a "Pizza Cart" (i.e. a list of pizzas they've submitted) and be able to view all the pies they've submitted to their "Pizza Cart"!

## Requirements
Don't worry about appearance, focus more on the functionality!
- You can query ALL pizza data from http://core-graphql.dev.waldo.photos/pizza. This should happen at runtime from the client (Pizza pricing can be quite volatile). Through this gql endpoint you can find:
  - Pizza sizes + base prices.
  - Toppings + prices.
  - Available toppings per pizza size, and whether they are selected by default for that size.
- User should be able to add/remove pizzas of any size to their cart.
- Use checkboxes to disable/enable toppings when adding a new pizza.  The pizza size determines the max number of toppings that can be toggled. Disable other topping checkboxes once they hit the max for a pizza. (A `maxToppings` of `null` means unlimited toppings!)
- Cost per pizza should be calculated and displayed based on pizza base costs + sum of selected toppings.
- Total cost should be calculated and displayed for all pizzas in the cart.

## Deliverables
1. A github or bitbucket repository with your source code. If you don't host your project somewhere publicly accessible, be sure to include ample instructions on how to install and run your app locally.

### Be Prepared to:
- Present your solution to a group of smart engineers like yourself.
- Talk about the decisions that went into the creation of your solution.
- Explain how you see the solution evolving over time.
- Discuss the runtime characteristics of the system.

#### Tips
- Don't spend more than a few hours on the project. We are looking for a strong understanding of the key concepts of implementing a Redux app, not a perfect implementation.
- The main areas we will be evaluating are app/form state management, gql querying, and robustness around an evolving data model (New pizzas or toppings shouldn't break your app).

#### Reading
- http://graphql.org/learn/
- http://cooking.nytimes.com/guides/1-how-to-make-pizza


#### Hint
Query to get all Pizza sizes with available toppings :
```
query	{
  pizzaSizes {
    name
    maxToppings
    basePrice
    toppings {
      defaultSelected
      topping {
        name
        price
      }
    }
  }
}
```