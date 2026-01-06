export { routeAdmin, routeUser };

const routeAdmin = {
  userAccess: ({ id }: { id: string }) => `/admin/user-access/${id}`,
};

const routeUser = {
  home: `/(user)/home`,
};
