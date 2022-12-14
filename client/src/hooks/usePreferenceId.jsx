import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanPreferenceId, getPreferenceId } from "../redux/actions/shopCart";

export const usePreferenceId = (shopCartItems) => {
  const dispatch = useDispatch();
  const preferenceId = useSelector(
    (state) => state.shopCartReducer.preferenceId
  );
  const actualUser = useSelector((state) => state.userReducer.user);
  const userId = actualUser.id;

  useEffect(() => {
    if (preferenceId === -1 && shopCartItems.length) { 
      if (userId) dispatch(getPreferenceId(shopCartItems, userId)) 
    }
  }, [preferenceId]);

  useEffect(() => {
    return () => {
      dispatch(cleanPreferenceId());
    };
  }, []);

  return { preferenceId };
};
