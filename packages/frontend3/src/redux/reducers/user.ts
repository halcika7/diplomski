import {
  UserActions,
  UserActionTypes,
  UserData,
  User,
  UserToEdit,
} from '../types/user';

export interface ProfileErrors {
  twitterLink: string;
  facebookLink: string;
  phone: string;
}

export interface AddUserErrors {
  email: string;
}

export interface UserState {
  users: User[] | null;
  userData: Record<string, string> | UserData;
  userToEdit: null | UserToEdit;
  message: string;
  status: number | null;
  profileErrors: ProfileErrors;
  loading: boolean;
  addUserErrors: AddUserErrors;
}

export const InitialProfileErrors = {
  twitterLink: '',
  facebookLink: '',
  phone: '',
};

export const INITIAL_STATE: UserState = {
  users: null,
  userData: {},
  userToEdit: null,
  message: '',
  status: null,
  profileErrors: InitialProfileErrors,
  loading: true,
  addUserErrors: { email: '' },
};

export function UserReducer(
  prevState = INITIAL_STATE,
  action: UserActionTypes
) {
  switch (action.type) {
    case UserActions.SET_USER_DATA:
      return { ...prevState, userData: { ...action.payload.data } };
    case UserActions.SET_USER_PHOTO:
      return {
        ...prevState,
        userData: { ...prevState.userData, picture: action.payload.url },
        message: action.payload.message,
        status: action.payload.status,
      };
    case UserActions.SET_UPLOAD_ERROR:
      return {
        ...prevState,
        status: action.payload.status,
        message: action.payload.message,
      };
    case UserActions.SET_USER_RESPONSE:
      return {
        ...prevState,
        status: action.payload.status,
        message: action.payload.message,
      };
    case UserActions.SET_USERS:
      return { ...prevState, users: action.payload, loading: !action.payload };
    case UserActions.SET_USER_TO_EDIT:
      return { ...prevState, userToEdit: action.payload };
    case UserActions.SET_PROFILE_ERRORS:
      return {
        ...prevState,
        profileErrors: { ...prevState.profileErrors, ...action.payload },
      };
    case UserActions.UPDATE_USER_DATA:
      return {
        ...prevState,
        userData: { ...prevState.userData, ...action.payload } as UserData,
      };
    case UserActions.SET_USER_ROLE:
      return {
        ...prevState,
        userToEdit: {
          ...prevState.userToEdit,
          role: action.payload,
        } as UserToEdit,
      };
    case UserActions.SET_USER_BLOCKED_STATUS: {
      const userToEdit = prevState.userToEdit;
      const users = Array.isArray(prevState.users)
        ? [...prevState.users]
        : prevState.users;

      if (userToEdit) {
        userToEdit.blocked = action.payload.blocked;
      }

      if (users) {
        const index = users.findIndex(user => user._id === action.payload.id);
        users[index] = { ...users[index], blocked: action.payload.blocked };
      }

      return {
        ...prevState,
        users,
        userToEdit,
      };
    }
    case UserActions.SET_ADD_USER_ERRORS:
      return {
        ...prevState,
        addUserErrors: { ...prevState.addUserErrors, ...action.payload },
      };
    default:
      return prevState;
  }
}
