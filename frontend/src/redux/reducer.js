
export default function reducer(state, action)
{
    switch(action.type)
    {
        case 'login':   return action.user;

        case 'edit':    return action.user;

        case 'logout':  return null;
    }
}