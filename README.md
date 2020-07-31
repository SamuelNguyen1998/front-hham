Front-end for the HHAM project.

# Build instruction
- Create a directory named `hham`.
- Clone `hham-frontend` into `hham` with the name `frontend`
- Clone `hham-backend` into `hham` with the name `backend`
- Run `npm install` (`npm i` for short) inside `backend` directory.

Then, in `frontend` directory, you can:
- Run `ng serve` and navigate to `localhost:4200` to view the front-end part.
- Run `ng build` to build the front-end, the result will be placed in the directory
`src/main/resources/static` of the `backend` directory. Now build and run the back-end,
 then navigate to `localhost:8080` instead.

About testing, in `frontend` you can:
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
