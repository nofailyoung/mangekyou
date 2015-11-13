import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';
import mangekyouConstant from './../constant/mangekyouConstant';

const mangekyouAction = {
  newImage(image) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.NEW_IMAGE,
      data: image,
    });
  },
  addHistory({operation, image}) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.ADD_HISTORY,
      data: {operation, image},
    });
  },
  loadHistory(index) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.LOAD_HISTORY,
      data: index,
    });
  },
  updatePreviewImage(image) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.UPDATE_CURRENT_IMAGE,
      data: image,
    });
  },
  triggerShowing(componentName) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouAction.TRIGGER_SHOWING,
      data: componentName,
    });
  },
};

export default mangekyouAction;
