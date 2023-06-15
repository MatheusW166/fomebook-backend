export function mapUserFollows(followType, followsList) {
  return followsList.map((userObjectFollowType) => {
    const user = userObjectFollowType[followType];
    user.followersCount = user._count.followers;
    user.followingCount = user._count.following;
    delete user._count;
    return user;
  });
}
