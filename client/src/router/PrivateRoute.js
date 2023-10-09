import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { addCategory, editAddCategory } from "../store/actions/category.action";
import Footer from "../components/Footer/Footer";

const PrivateRoute = ({ isLoggedIn, categories, addCategory, component: Component, ...rest }) => (
  <>
  <Route
    {...rest}
    component={props =>
      isLoggedIn ? (
        <div>
            <Component {...props} categories={categories} />
        </div>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  <Footer
    addCategory={addCategory}
  />
  </>
);

const mapDispatchToProps = dispatch => ({
  addCategory: category => dispatch(addCategory(category)),
  editAddCategory: obj => dispatch(editAddCategory(obj))
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  text: state.text,
  selected: state.selected,
  categories: state.category.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
