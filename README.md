# Example of ingite boilerplate + expo-router + supabase auth

There is an ignite cookbook recipe for [Authentication with Supabase](https://ignitecookbook.com/docs/recipes/Authentication) and this example mostly follows that recipe.  The only difference is that this example uses expo-router instead of react-navigation.

I'm also referencing the expo documentation on [Authentication in Expo Router](https://docs.expo.dev/router/reference/authentication/) and the Supabase docs for [Auth with React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native) to try to follow their implementation guidelines.

One thing to note when using ignite generators for new screens in apps configured for expo-router is that the generator will not place them in the correct location.  Ignite generators use something called front matter and it will drop the screen in `./app/screens/screen-name.tsx` instead of `./src/app/screen-name.tsx` and with expo router your screen might be nested deeper than the app folder.  This is why you will need to specify the `--dir` location for the screen generator like this:

`bunx ignite-cli@latest generate screen SignIn --dir ./src/app`

You will also want to modify your `/ignite/templates/screen/NAME.tsx.ejs` template to update your import statements.  Replace `from "app/components" with from "@/components"` Along with any other changes that make sense for your application.
