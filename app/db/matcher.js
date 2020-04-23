import materials from './materials';
import diys from './diys';

export const getMaterialsFromDIY = diy => {
  const diysNames = diys.map(d => d.name.toLowerCase());
  const materialsNames = materials.map(m => m.name.toLowerCase());

  const materialsFromDIY = diy.materials.map(m =>
    diysNames.includes(m.materialName.toLowerCase())
      ? getMaterialsFromDIY(
          diys.find(d => d.name.toLowerCase() === m.materialName.toLowerCase()),
        )
      : m,
  );

  return materialsFromDIY.flat();
};
