export function mapUsersFollowCount(users) {
  return users.map((user) => {
    user.followersCount = user._count.followers;
    user.followingCount = user._count.following;
    delete user._count;
    return user;
  });
}
