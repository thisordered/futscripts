import { getValue } from "../services/repository";

export const itemPileOverride = () => {
  const isPileFull = UTItemDomainRepository.prototype.isPileFull;
  UTItemDomainRepository.prototype.isPileFull = function (...args) {
    const enhancerSetting = getValue("EnhancerSettings") || {};
    if (enhancerSetting["idUnassignedPileSize"]) {
      MAX_NEW_ITEMS = enhancerSetting["idUnassignedPileSize"];
      this.pileSizes.set(
        ItemPile.PURCHASED,
        enhancerSetting["idUnassignedPileSize"]
      );
    }
    return isPileFull.call(this, ...args);
  };
};
