import "./closeFriend.css"

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.favRecipePicture} alt="" />
        <span className="sidebarFriendName">{user.favRecipeName}</span>
    </li>
  );
}
