import Crew from './Crew';

interface Ship {
  name: string,
  position: number,
  quantity: number,
  weapons: string[],
  crew: Crew
}

export default Ship;