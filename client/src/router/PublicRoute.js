import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { addCategory, editAddCategory } from "../store/actions/category.action";
import Footer from "../components/Footer/Footer";

const PublicRoute = ({ isLoggedIn, categories, component: Component, ...rest }) => (
  <>
    <Route
      {...rest}
      component={props => (
          <Component {...props} />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
