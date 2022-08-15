import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef()

class NavigationService {
    navigate = (name: any, params?: any) => {
        if (navigationRef.isReady()) {
            navigationRef.navigate(name, params);
        }
    }
}

const navigationService = new NavigationService();

export default navigationService;