
export default function reducer(state, action)
{
    switch(action.type)
    {
        case 'login':   return action.token;

        case 'edit':    return action.token;

        case 'logout':  return null;
    }
}