
# Pizza order demo

Small app to solve the problem given.
For this app we used :
- React
- Flux ( instead of Redux )
- Immutable
- Browserify
- ESLint
- Make

## Usage
- Clone the repo.
- Install the npm dependencies ( do `yarn install` or `npm i` if you're old school 
:) )
- to build the assets, run `make`. If you don't have make installed, don't worry.
you can checkout the `build-ready` branch, where the `/static` directory is 
already commited with the static files.
( for dev version )
- start a server that can serve the `/static` directory.
( for example, if you have python, go in the `/static/ directory and do 
`python -m SimpleHTTPServer 8081` )


## Design 
The app is a typical React app.
For the data flow I used flux since it's simpler and more flexible than redux.
The same principles were applied though.

The state is immutable ( using the Immutable library ), we have reducers, that 
take the current state and the action, and make a new state, and there's a 
"middleware" mechanism, to add reducers or other functions in the flow.

For the components, there's a simple hierarchy, where we have Units ( simple 
components that have no dependencies ), Blocks ( components made up by Units )
and Pages ( the top level components that can be thought as a "Page" ).

## Flow
There's a simple flow in the app.
Initially, when the App first starts, we send a `fetchPizzaData` action, to 
make a request for the data.
( there's a slight problem with the GraphQL server. Initially it was working 
fine, but since Monday morning, I'm getting a 307 response. So I used a fallback
where I server a saved mock response if the initial request fails )

The App renders a message while it's waiting for the data.
Once we get the data, we render the `newPizza` section, which is where the user
starts selecting the new pizza he/she wants to add to the cart.
Validations there are based on `maxToppings` as asked.

Once the user is happy with the selection, the new pizza can be added to the 
cart.

There's a separate section for the `Cart` at the bottom of the page, to make it 
easy to distinguish.